
interface FailData {
    error: Error;
}

/**
 * Easily adds status to any data:
 * type Data = { myNumber: number };
 * type DataResponse = BackendResponse<Data>;
 * 
 * And then it can be easily broken down:
 * const { status, error, myNumber } = () => BackendResponse<Data>; // some function
 * and if you switch/check status, the types are strict and exact
 */
export type BackendResponse<T extends {}> =
    ({ status: 'waiting'; } & Partial<T> & Partial<FailData>) |
    ({ status: 'failed'; } & Partial<T> & FailData) |
    ({ status: 'ready'; } & T & Partial<FailData>);
