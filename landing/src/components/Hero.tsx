import { Button } from "flowbite-react";
import { type FC } from "react";

export const Hero: FC = () => (
  <section className="bg-white dark:bg-gray-900">
    <div className="container m-auto">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          API для генерации одноразовых пин-кодов
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Аутентификация, авторизация, подтверждения транзакций
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Button color="gray" href="#demo">
            Демо
          </Button>
          <Button color="dark" href="https://console.pin-codes.ru/auth/register">
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </div>
  </section>
);
