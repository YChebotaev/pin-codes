import { type FC } from "react";
import { Typography } from "antd";
import { AppLayout } from "../layouts/AppLayout";

export const DocumentationPage: FC = () => (
  <AppLayout selectedMenuItem="documentation">
    <Typography.Title>Интеграция</Typography.Title>
    <Typography.Title level={2}>Генерация пин-кода</Typography.Title>
    <Typography.Paragraph strong>
      Пин-код может иметь количество символов больше 4-х. Это зависит от размера
      базы непогашенных пин-кодов. Рекомендуется погашать пин-коды с помощью
      <Typography.Text code>/redeem</Typography.Text>
    </Typography.Paragraph>
    <Typography.Paragraph>
      Если пин-код был погашен, то при последующих вызовах{" "}
      <Typography.Text code>/create</Typography.Text>, этот пин-код может быть
      сгенерирован еще раз
    </Typography.Paragraph>
    <Typography.Paragraph>Отправьте POST-запрос на адрес:</Typography.Paragraph>
    <Typography.Paragraph>
      <Typography.Text code copyable>
        https://api.pin-codes.ru/create
      </Typography.Text>
    </Typography.Paragraph>
    <Typography.Paragraph>
      В заголовке <Typography.Text code>Authorization</Typography.Text> укажите
      Bearer-токен, полученный при создании генератора
    </Typography.Paragraph>
    <Typography.Paragraph>
      Пример:{" "}
      <Typography.Text code>
        Authorization: Bearer &lt;&lt;токен&gt;&gt;
      </Typography.Text>
    </Typography.Paragraph>
    <Typography.Paragraph>
      Установите заголовок{" "}
      <Typography.Text code>Content-Type: application/json</Typography.Text>
    </Typography.Paragraph>
    <Typography.Paragraph>
      В теле запроса задайте такую структуру:
      <Typography.Paragraph
        code
      >{`{"payload": <<любый данные в JSON-формате>>}`}</Typography.Paragraph>
    </Typography.Paragraph>
    <Typography.Paragraph>
      Когда вы будете проверять пин-код (эндпоинты
      <Typography.Text code>/redeem</Typography.Text>,
      <Typography.Text code>/lookup</Typography.Text>), данные, заданные в
      <Typography.Text code>payload</Typography.Text>-е вернутся без изменений
    </Typography.Paragraph>
    <Typography.Paragraph>
      Пример ответа:{" "}
      <Typography.Text code>{`{"code": "1234"}`}</Typography.Text>
    </Typography.Paragraph>

    <Typography.Title level={2}>Получение пин-кода</Typography.Title>
    <Typography.Paragraph>Отправьте GET-запрос на адрес:</Typography.Paragraph>
    <Typography.Paragraph>
      <Typography.Text code copyable>
        https://api.pin-codes.ru/lookup?code=1234
      </Typography.Text>
    </Typography.Paragraph>
    <Typography.Paragraph>
      В query-string параметре <Typography.Text code>code</Typography.Text>{" "}
      укажите сам пин-код
    </Typography.Paragraph>
    <Typography.Paragraph>
      В заголовке <Typography.Text code>Authorization</Typography.Text> укажите
      Bearer-токен, полученный при создании генератора
    </Typography.Paragraph>
    <Typography.Paragraph>
      Пример:{" "}
      <Typography.Text code>
        Authorization: Bearer &lt;&lt;токен&gt;&gt;
      </Typography.Text>
    </Typography.Paragraph>
    <Typography.Paragraph>
      Этот эндпоинт просто вернет
      <Typography.Text code>"payload"</Typography.Text>, заданный с помощью{" "}
      <Typography.Text code>/create</Typography.Text>
    </Typography.Paragraph>

    <Typography.Title level={2}>Погашение пин-кода</Typography.Title>
    <Typography.Paragraph>Отправьте POST-запрос на адрес:</Typography.Paragraph>
    <Typography.Paragraph>
      <Typography.Text code copyable>
        https://api.pin-codes.ru/redeem
      </Typography.Text>
    </Typography.Paragraph>
    <Typography.Paragraph>
      В заголовке <Typography.Text code>Authorization</Typography.Text> укажите
      Bearer-токен, полученный при создании генератора
    </Typography.Paragraph>
    <Typography.Paragraph>
      Пример:{" "}
      <Typography.Text code>
        Authorization: Bearer &lt;&lt;токен&gt;&gt;
      </Typography.Text>
    </Typography.Paragraph>
    <Typography.Paragraph>
      Установите заголовок{" "}
      <Typography.Text code>Content-Type: application/json</Typography.Text>
    </Typography.Paragraph>
    <Typography.Paragraph>
      В теле запроса задайте такую структуру:
      <Typography.Paragraph code>{`{"code": "1234"}`}</Typography.Paragraph>
    </Typography.Paragraph>
    <Typography.Paragraph>
      Этот эндпоинт вернет
      <Typography.Text code>"payload"</Typography.Text>, заданный с помощью
      <Typography.Text code>/create</Typography.Text>{" "}
      <Typography.Text strong>
        и удалит пин-код из базы так, что в последствии может быть выдан такой
        же пин-код, но с другим payload-ом
      </Typography.Text>
    </Typography.Paragraph>
    <Typography.Paragraph>
      Рекомендуется вначале получить payload пин-кода с помощью
      <Typography.Text code>/lookup</Typography.Text>, а затем вызывать
      <Typography.Text code>/redeem</Typography.Text>, чтобы погасить его. Так,
      база непогашенных пин-кодов будет расти медленнее.
    </Typography.Paragraph>
    <Typography.Paragraph strong>
      В случае, если непогашенных пин-кодов станет слишком много, количество
      символов в пин-коде будет расти
    </Typography.Paragraph>
  </AppLayout>
);
