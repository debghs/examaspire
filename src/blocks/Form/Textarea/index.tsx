import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/label'
import { Textarea as TextAreaComponent } from '@/components/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width }) => {
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

      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        className="w-full px-4 py-4 border border-bianca-200 rounded-xl text-[#201A09] text-base placeholder:text-[#A07D1C] focus:outline-none focus:border-[#FAC638] focus:ring-1 focus:ring-[#FAC638] focus-visible:ring-offset-0  transition-all"
        {...register(name, { required: required })}
      />

      {errors[name] && <Error />}
    </Width>
  )
}
