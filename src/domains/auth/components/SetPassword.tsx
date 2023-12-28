'use client'

import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { HBButton, HBIcon } from '@/core/components/index'
import { usePostAuthCustomerSetPassword } from '@/services/ids-services/ids'
import { PasswordTextField } from '@/shared/components'
import { regexps } from '@/shared/constants'

import {
  capitalRegex,
  numberRegex,
  PasswordCheckerProps,
  RulesType,
  smallChrRegex,
  specialCharRegex,
  StepEnum,
} from '../authType.d'
import { useAuthStore } from '../hooks/useAuthStore'

const passwordRegex: Partial<Record<RulesType, RegExp>> = {
  capitalChr: capitalRegex,
  smallChr: smallChrRegex,
  number: numberRegex,
  specialChar: specialCharRegex,
}

const PasswordChecker = (props: PasswordCheckerProps) => {
  const { rules: rulesProps, value, onValid, minLength = 8, maxLength = 20 } = props
  const [rules, setRules] = useState<Record<string, { message?: ReactNode; isValid?: boolean }>>({})

  const handleValidate = (rule: RulesType) => {
    if (value.length === 0) return undefined
    else if (rule === 'minLength') return value.length > minLength
    else if (rule === 'maxLength') return value.length < maxLength
    return passwordRegex[rule]?.test(value)
  }

  useEffect(() => {
    //TODO: change any type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const object: Record<string, any> = new Object()
    Object.keys(rulesProps).forEach(rule => {
      object[rule] = { message: rulesProps[rule as RulesType], isValid: handleValidate(rule as RulesType) }
    })
    setRules(object)
    if (value.length) onValid(Object.values(object).findIndex(obj => obj.isValid === false) === -1)
  }, [value])

  const handleColor = (isValid?: boolean) => {
    if (isValid === undefined) return 'textAndIcon.darker'
    else if (isValid) return 'success.dark'
    return 'secondary.main'
  }

  return (
    <Stack spacing={2}>
      {Object.keys(rules).map(rule => (
        <Typography variant="bodyMedium" color={'textAndIcon.darker'} key={rule} display={'flex'} alignItems="center">
          {rules[rule]?.message}
          {handleColor(rules[rule]?.isValid).includes('success') && (
            <HBIcon name="check" sx={{ color: 'success.dark', ml: 1 }} size="small" />
          )}
        </Typography>
      ))}
    </Stack>
  )
}

export const SetPassword = () => {
  const { push } = useRouter()
  const { setting, changePasswordToken, updateStep } = useAuthStore()
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const { mutateAsync, isPending } = usePostAuthCustomerSetPassword()
  const { getValues, handleSubmit } = useFormContext()

  const rules = useMemo(() => {
    const rulesItem: PasswordCheckerProps['rules'] = {
      minLength: ` حداقل ${setting?.security?.passwordMinLength || 8} کاراکتر`,
    }
    if (setting?.security?.passwordLevel === 'Medium' || setting?.security?.passwordLevel === 'High') {
      rulesItem.capitalChr = 'شامل حروف بزرگ و کوچک انگلیسی'
      rulesItem.number = 'استفاده از اعداد'
    }
    if (setting?.security?.passwordLevel === 'High') rulesItem.specialChar = 'شامل نشانه و کاراکتر (مانند @ # $ *) '
    return rulesItem
  }, [setting])

  const handleSetPassword = () => {
    mutateAsync({
      data: { newPassword: value, otpToken: changePasswordToken, userName: getValues('username') },
    }).then(async res => {
      if (res.success) {
        const response = await signIn('SIGN_IN', {
          username: getValues('username'),
          password: value,
          redirect: false,
        })
        if (response?.error || !response?.ok) updateStep(StepEnum.checkPhoneNumber)
        else push('/')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(handleSetPassword)}>
      <Stack spacing={4}>
        <PasswordTextField
          label="کلمه عبور"
          inputProps={{
            pattern: regexps.allowLetters,
          }}
          value={value}
          onChange={val => setValue(val?.target?.value)}
          autoFocus
        />
        <PasswordChecker
          value={value}
          rules={rules}
          onValid={isValid => setIsValid(isValid)}
          maxLength={setting?.security?.passwordMaxLength || 20}
          minLength={setting?.security?.passwordMinLength || 8}
        />
        <HBButton variant="primary" type="submit" disabled={!isValid || isPending} loading={isPending}>
          تغییر رمز
        </HBButton>
      </Stack>
    </form>
  )
}
