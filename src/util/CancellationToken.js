class CancellationToken {
    constructor() {
        this._isCancelled = false;
        this.cancelCallbacks = [];
    }

    get isCancelled() {
        return this._isCancelled;
    }

    cancel() {
        this._isCancelled = true;
        this.cancelCallbacks.forEach(cb => cb());
    }

    onCancel(callback) {
        if (this.isCancelled) {
            callback();
        } else {
            this.cancelCallbacks.push(callback);
        }
    }

    throwIfCancelled() {
        if (this._isCancelled) {
        throw new CancelledError("Operation cancelled");
        }
    }
}

class CancelledError extends Error {}