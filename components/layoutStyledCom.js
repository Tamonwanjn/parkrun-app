import { css } from 'styled-components'

export const mediaIpad = {
  Ipad: (...args) => css`
    @media (max-width: 1024px) {
      ${css(...args)}
    }
  `,
}

export const mediaIpadmini = {
  Ipadmini: (...args) => css`
      @media (max-width: 768px) {
        ${css(...args)}
      }
    `,
}

export const mediaMobileFormAnt = {
  Mobile2: (...args) => css`
    @media (max-width: 576px) {
      ${css(...args)}
    }
  `,
}
export const mediaMobile = {
  Mobile: (...args) => css`
      @media (max-width: 425px) {
        ${css(...args)}
      }
    `,
}

export const sizeLessThanDesktop = {
  sizeLessThanDesktop: (...args) => css`
        @media (max-width: 767px) {
          ${css(...args)}
        }
      `,
}
