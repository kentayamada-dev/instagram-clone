import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import { HiSearch } from "react-icons/hi";
import type { FormType, SearchBoxType } from "./index.types";
import type { SubmitHandler } from "react-hook-form";

export const SearchBox: SearchBoxType = () => {
  const iconContextValue = React.useMemo(
    () => ({
      className: "global-class-name",
      color: "#707a83",
      style: {
        height: "24px",
        width: "24px"
      }
    }),
    []
  );
  const { register, handleSubmit } = useForm<FormType>();

  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);

  return (
    <IconContext.Provider value={iconContextValue}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <InputGroup>
            <InputLeftElement
              // eslint-disable-next-line react/no-children-prop
              children={<HiSearch />}
              pointerEvents="none"
            />
            <Input
              placeholder="Search items"
              type="text"
              {...register("query")}
            />
          </InputGroup>
        </FormControl>
      </form>
    </IconContext.Provider>
  );
};
