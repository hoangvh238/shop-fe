import { toast } from "sonner";

const Toast = async (f: any, value: any, message: string) => {
  const promise = () =>
    new Promise<void>(async (resolve, reject) => {
      try {
        await f(value).unwrap();

        return resolve();
      } catch (err) {
        return reject();
      }
    });

  await toast.promise(promise, {
    loading: "Loading...",
    success: `${message} thành công`,
    error: `${message} thất bại`,
  });
};

export default Toast;
