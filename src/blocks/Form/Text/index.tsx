import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { Label } from '@/components/label'
import { Input } from '@/components/input'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} className="block mb-3 text-[#201A09] font-medium text-base">
        {label}
        {required && (
          <span className="text-[#AB2217] ml-1">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        placeholder={label}
        className="w-full px-4 py-4 border border-bianca-200 rounded-xl text-[#201A09] text-base placeholder:text-[#A07D1C] focus:outline-none focus:border-[#FAC638] focus:ring-1 focus:ring-[#FAC638] focus-visible:ring-offset-0  transition-all"
        {...register(name, { required })}
      />
      {errors[name] && <Error message={errors[name]?.message as string} />}
    </Width>
  )
}
