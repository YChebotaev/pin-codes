"use client";

import { useState, type FC } from "react";
import {
  Button,
  FloatingLabel,
  HelperText,
  Label,
  Textarea,
} from "flowbite-react";
import { useDemo } from "@/hooks/useDemo";

export const Demo: FC = () => {
  const [payload, setPayload] = useState(`{
  "payload": { "hello": "world" }
}`);
  const { isLoading, lastValue, lastError, generate } = useDemo(payload);

  return (
    <section id="demo" className="bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-2xl text-center px-4">Демо</h2>
        <div className="max-w-96 p-4 mx-auto">
          <form>
            <FloatingLabel
              disabled
              variant="outlined"
              label="HTTP POST"
              value="https://api.pin-codes.ru/create"
            />
            <div className="mb-4">
              <Label htmlFor="payload">Body</Label>
              <Textarea
                required
                disabled={isLoading}
                id="payload"
                rows={6}
                defaultValue={payload}
                onChange={(e) => {
                  setPayload(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <Button
                color="gray"
                disabled={isLoading}
                onClick={() => {
                  generate();
                }}
              >
                Отправить
              </Button>
            </div>
            <div>
              <FloatingLabel
                disabled
                variant="outlined"
                label="Сгенерированный пин-код"
                value={lastValue?.code}
              />
              {lastError && (
                <HelperText color="failure">
                  {"message" in lastError
                    ? (lastError.message as string)
                    : JSON.stringify(lastError)}
                </HelperText>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
