export interface ScrapperStreamsAdapter<P> {
    getStream: <T, O>(page: P, options: O) => Promise<T>
}