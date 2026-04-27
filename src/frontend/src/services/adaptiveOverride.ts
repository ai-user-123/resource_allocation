const THROUGHPUT_TARGET = 198;
const THROUGHPUT_THRESHOLD = 0.7;
const CHECK_INTERVAL_MS = 500;
const CONSECUTIVE_REQUIRED = 2;

type OverrideCallback = (active: boolean) => void;

export class AdaptiveOverrideMonitor {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private consecutiveLowCount = 0;
  private isOverrideActive = false;
  private onOverride: OverrideCallback;
  private getCurrentThroughput: () => number;

  constructor(
    getCurrentThroughput: () => number,
    onOverride: OverrideCallback,
  ) {
    this.getCurrentThroughput = getCurrentThroughput;
    this.onOverride = onOverride;
  }

  start(): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.check(), CHECK_INTERVAL_MS);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.reset();
  }

  private check(): void {
    const current = this.getCurrentThroughput();
    const minTarget = THROUGHPUT_TARGET * THROUGHPUT_THRESHOLD;
    const isBelowThreshold = current < minTarget;

    if (isBelowThreshold) {
      this.consecutiveLowCount++;
      if (
        this.consecutiveLowCount >= CONSECUTIVE_REQUIRED &&
        !this.isOverrideActive
      ) {
        this.triggerOverride();
      }
    } else {
      if (this.isOverrideActive) {
        this.recover();
      }
      this.consecutiveLowCount = 0;
    }
  }

  private triggerOverride(): void {
    this.isOverrideActive = true;
    this.onOverride(true);
  }

  private recover(): void {
    this.isOverrideActive = false;
    this.consecutiveLowCount = 0;
    this.onOverride(false);
  }

  private reset(): void {
    this.consecutiveLowCount = 0;
    this.isOverrideActive = false;
  }

  isActive(): boolean {
    return this.isOverrideActive;
  }

  getConsecutiveCount(): number {
    return this.consecutiveLowCount;
  }
}
