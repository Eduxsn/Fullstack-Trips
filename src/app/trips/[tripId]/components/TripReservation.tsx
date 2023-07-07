"use client"

import React from "react";
import { Controller, useForm } from "react-hook-form"

import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { Trip } from "@prisma/client"

interface TripReservationProps {
  trip: Trip
}

interface TripReservationForm {
  guests: number;
  startDate: Date | null
  endDate: Date | null
}

const TripReservation = ({trip}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState:{ errors },
    control
  } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div>
      <div className="flex flex-col px-5">
        <div className="flex gap-4">
          <Controller
            name="startDate"
            rules={{
              required : {
                value: true,
                message: "Data inicial é obrigatória"
              },
            }}
            control={control}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                error={!!errors?.startDate}
                errorMessage={errors.startDate?.message}
                selected={field.value}
                placeholderText="Data de Início"
                className="w-full"/>
            )}
          />
          <Controller
            name="endDate"
            rules={{
              required : {
                value: true,
                message: "Data final é obrigatória"
              },
            }}
            control={control}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                error={!!errors?.endDate}
                errorMessage={errors.endDate?.message}
                selected={field.value}
                placeholderText="Data final"
                className="w-full"/>
            )}
          />
        </div>

        <Input {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório."
          },
        })}
        placeholder={`Número de hóspedes (max:${trip.maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        />

        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDarker">Total: </p>
          <p className="font-medium text-sm text-primaryDarker">R$ 2.500</p>
        </div>

        <div className=" pb-10 border-b border-grayLighter w-full">
          <Button onClick={() => handleSubmit(onSubmit)()} className="mt-3 w-full">Reservar agora</Button>
        </div>
      </div>
    </div>
  )
}

export default TripReservation