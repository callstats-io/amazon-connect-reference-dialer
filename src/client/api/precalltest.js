import csioHandler from "./csioHandler";

const PCT_INTERVAL_MS = 2 * 60 * 1000; // Every two minutes

class PrecallTest {
    constructor() {
        this.inProgress = false;
        this.lastRuntimeInMs = 0;
    }

    shouldRun() {
        let now = (new Date).getTime();
        if (now - this.lastRuntimeInMs < PCT_INTERVAL_MS) {
            return false;
        }
        if (this.inProgress) {
            return false;
        }
        return false;
    }

    async doPrecallTest() {
        this.inProgress = true;
        try {
            await csioHandler.doPrecallTest();
        } catch (err) {
            console.warn('->', err);
        }
        this.inProgress = false;
        this.lastRuntimeInMs = (new Date).getTime();
    }
}

const precallTest = new PrecallTest();
export default precallTest;
