import { type FC } from "react";
import Image from "next/image";
import { Button, ButtonGroup, Navbar, NavbarBrand } from "flowbite-react";
import logoSrc from "../assets/logo.svg";

export const TopBar: FC = () => {
  return (
    <div className="container m-auto">
      <Navbar fluid rounded>
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <Image src={logoSrc} width={40} height={40} alt="Pin-Codes logo" />
            <div className="text-lg">pin-codes.ru</div>
          </div>
        </NavbarBrand>
        <div className="flex md:order-2 gap-2">
          <Button
            outline
            color="gray"
            href="https://console.pin-codes.ru/auth/login"
            onClick={() => {
              ym(96492391, "reachGoal", "goto-login");
            }}
          >
            Войти
          </Button>
          <Button
            color="dark"
            href="https://console.pin-codes.ru/auth/register"
            onClick={() => {
              ym(96492391, "reachGoal", "goto-register");
            }}
          >
            Зарегистрироваться
          </Button>
        </div>
      </Navbar>
    </div>
  );
};
