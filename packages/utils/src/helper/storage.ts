class MyStorage implements Storage {
    [name: string]: any;
    length = 0;

    clear(): void {
        throw new Error("Method not implemented.");
    }
    getItem(key: string): string | null {
        throw new Error("Method not implemented.");
    }
    key(index: number): string | null {
        throw new Error("Method not implemented.");
    }
    removeItem(key: string): void {
        throw new Error("Method not implemented.");
    }
    setItem(key: string, value: string): void {
        throw new Error("Method not implemented.");
    }

}