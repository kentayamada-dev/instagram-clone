import "react-i18next";
import type common from "../public/locales/en/common.json";
import type footer from "../public/locales/en/footer.json";
import type form from "../public/locales/en/form.json";

declare module "react-i18next" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/naming-convention
  interface CustomTypeOptions {
    resources: {
      common: typeof common;
      footer: typeof footer;
      form: typeof form;
    };
  }
}
