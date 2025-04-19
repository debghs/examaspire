import { toTitleCase } from './caseUtils'

export const isTaarSwar = (swar: string) => {
  const lowerSwar = swar.toLowerCase()
  return lowerSwar.includes('taar')
}

export const isKomalSwar = (swar: string) => {
  const lowerSwar = swar.toLowerCase()
  return lowerSwar.includes('komal')
}

export const isMandraSwar = (swar: string) => {
  const lowerSwar = swar.toLowerCase()
  return lowerSwar.includes('mandra')
}

export const getBaseSwar = (swar: string) => {
  const lowerSwar = swar.toLowerCase()
  return toTitleCase(lowerSwar.replace(/taar|komal|mandra/, ''))
}

// Base swar mapping
const basicMap: Record<string, string> = {
  comma: ',',
  sa: 'Sa',
  re: 'Re',
  ga: 'Ga',
  ma: 'Ma',
  pa: 'Pa',
  dha: 'Dha',
  ni: 'Ni',
}

// const getBaseSwar = (input: string): string => {
//     for (const [key, value] of Object.entries(basicMap)) {
//       if (input.toLowerCase().endsWith(key)) {
//         return value
//       }
//     }
//     return input
//   }
