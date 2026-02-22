export type Success<T> = {
  data: T;
  error: null;
};

export type Failure<E> = {
  data: null;
  error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

export async function doMath() {
  const value = Math.random();
  if (value > 0.5) throw new Error("Number too large");
  return value;
}

export async function demo() {
  const { data: someData, error: someError } = await tryCatch(doMath());
  if (someError) {
    return { error: "unable to process" };
  }

  return someData;
}

type Good<T> = {
  data: T;
  error: null;
};

type Bad<E> = {
  data: null;
  error: E;
};

type Data<T, E = Error> = Good<T> | Bad<E>;

export async function happyData<T, E = Error>(
  promise: Promise<T>,
): Promise<T> {
  try {
    const data = await promise;
    return data;
  } catch (error) {
    console.log(error);
    return error as T;
  }
}

export async function cool() {
  const goodData = await happyData(doMath());
  return goodData;
}
