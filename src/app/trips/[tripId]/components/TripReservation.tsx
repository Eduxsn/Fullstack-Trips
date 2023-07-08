"use client"

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form"

import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { Trip } from "@prisma/client"
import { differenceInDays, subDays } from "date-fns";
import { TailSpin } from "react-loader-spinner";

interface TripReservationProps {
  tripId: string;
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
}

interface TripReservationForm {
  tripId: string;
  guests: number;
  startDate: Date | null
  endDate: Date | null
}

const TripReservation = ({ tripStartDate, tripEndDate, maxGuests, pricePerDay, tripId }: TripReservationProps) => {
  const [isFetching, setIsFetching] = useState(true)

  const {
    register,
    handleSubmit,
    formState:{ errors },
    control,
    watch,
    setError,
  } = useForm<TripReservationForm>();

  const onSubmit = async (data: TripReservationForm) => {
    setIsFetching(false)
    const response = await fetch('http://localhost:3000/api/trips/check', {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId
        })
      )
    });
    setIsFetching(true)

    const res = await response.json();

    if (res?.error?.code === 'TRIP_ALREADY_RESERVED') {
      setError("startDate", {
        type: "manual",
        message: "Esta data já está reservada"
      })

      setError("endDate", {
        type: "manual",
        message: "Esta data já está reservada"
      })
    }

    if (res?.error?.code === 'INVALID_START_DATE') {
      setError("startDate", {
        type: "manual",
        message: "Data inválida"
      })
    }

    if (res?.error?.code === 'INVALID_END_DATE') {
      setError("endDate", {
        type: "manual",
        message: "Data inválida"
      })
    }

  };


  const startDate = watch("startDate");
  const endDate = watch("endDate");

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
                className="w-full"
                minDate={tripStartDate}
              />
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
                className="w-full disabled:cursor-not-allowed"
                maxDate={tripEndDate}
                minDate={startDate ??  tripStartDate}
                disabled={!startDate}
                />
            )}
          />
        </div>

        <Input {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório."
          },
        })}
        placeholder={`Número de hóspedes (max:${maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        inputMode="numeric"
        />

        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDarker">{startDate && endDate ? `Total (${differenceInDays(endDate, startDate)} noites)` : "Total" }</p>
          <p className="font-medium text-sm text-primaryDarker">
          {startDate && endDate ? 
          `R$ ${differenceInDays(endDate, startDate) * pricePerDay}`
          : "R$ 0"}
          </p>
          
        </div>

        <div className=" pb-10 border-b border-grayLighter w-full">
          <Button disabled={!isFetching} onClick={() => handleSubmit(onSubmit)()} className="mt-3 w-full flex justify-center">
            {isFetching ? "Reservar agora" : <TailSpin height={20} color="#FFF"/> }
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TripReservation