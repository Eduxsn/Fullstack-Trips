"use client"

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from '../../components/CurrencyInput';
import { useRouter } from "next/navigation";

interface TripSearchForm {
  text: string;
  startDate: Date | null;
  budget: string;
}

const TripSearch = () => {
  const router = useRouter();
  const {control, formState: {errors}, register, handleSubmit} = useForm<TripSearchForm>() ;

  const onSubmit = (data: TripSearchForm) => {
    router.push(`/trips/search?text=${data.text}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`);
  }
  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-norepeat lg:p-y-28">
      <h1 className="font-semibold text-2xl text-primaryDarker text-center lg:text-[2.5rem]">Encontre sua próxima <span className="text-primary">viagem!</span></h1>

      <div className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:p-4 lg:bg-primary lg:bg-opacity-20 lg:rounded-lg lg:mt-12">
        <Input
          placeholder="Onde você quer ir?"
          error={!!errors.text}
          errorMessage={errors.text?.message}
          {...register('text', {
            required: {
              value: true,
              message: "Local é obrigatório"
            },
          })}
        />

        <div className="flex gap-4 lg:w-full">
        <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                placeholderText="Data final"
                className="w-full disabled:cursor-not-allowed"
                minDate={new Date()}
                />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput placeholder="Orçamento" allowDecimals={false} onValueChange={field.onChange as any} value={field.value} onBlur={field.onBlur}  />
            )}
          />


        </div>

        <Button className="lg:w-1/2" onClick={() => handleSubmit(onSubmit)()}>Buscar</Button>
      </div>

      
    </div>
  
  )
}

export default TripSearch