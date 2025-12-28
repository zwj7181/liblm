
import { address_options } from '@lm_fe/env'
import { get, map } from 'lodash'






// 获取街道
export const getStreets = async (p: any, c: any, a: any) => {
  // if (a.match(RegExp(/香港|澳门|台湾|海外/))) {
  //   return []
  // }
  const STREETS = await address_options.STREETS()

  const street = STREETS[p] && STREETS[p][c] && STREETS[p][c][a]
  if (!street) {
    return []
  }
  return Object.keys(street).map((streetName) => {
    const streetItem = street[streetName]
    return {
      label: streetName,
      value: streetName,
      children: streetItem.map((village) => {
        return {
          label: village,
          value: village
        }
      }),
    }
  })
}

async function get_address_options_base() {
  const MAINLAND = await address_options.MAINLAND()
  const OVERSEA = await address_options.OVERSEA()
  const HKMOTW = await address_options.HKMOTW()
  const STREETS = await address_options.STREETS()

  const _mainland = Object.keys(MAINLAND).map((provinceName) => {
    const provinceItem = MAINLAND[provinceName]
    return {
      label: provinceName,
      value: provinceName,
      children: Object.keys(provinceItem).map((cityName) => {
        const cityItem = provinceItem[cityName]
        return {
          label: cityName,
          value: cityName,
          children: cityItem.map((area) => {
            const areaItem = STREETS[provinceName] && STREETS[provinceName][cityName] && STREETS[provinceName][cityName][area]
            return {
              label: area,
              value: area,
              children: areaItem && Object.keys(areaItem).map((streetName) => {
                const streetItem = areaItem[streetName]
                return {
                  label: streetName,
                  value: streetName,
                  children: streetItem.map(village => {
                    return {
                      label: village,
                      value: village
                    }
                  }),
                }
              })
            }
          }),
        }
      }),
    }
  })
  const _hkmotw = Object.keys(HKMOTW).map((provinceName) => {
    const provinceItem = HKMOTW[provinceName]
    return {
      label: provinceName,
      value: provinceName,
      children: Object.keys(provinceItem).map((cityName) => {
        const cityItem = provinceItem[cityName]
        return {
          label: cityName,
          value: cityName,
          children: cityItem.map(area => {
            return {
              label: area,
              value: area
            }
          }),
        }
      }),
    }
  })

  const _oversea = Object.keys(OVERSEA).map((provinceName) => {
    const provinceItem = OVERSEA[provinceName]
    return {
      label: provinceName,
      value: provinceName,
      children: Object.keys(provinceItem).map((cityName) => {
        const cityItem = provinceItem[cityName]
        return {
          label: cityItem,
          value: cityItem
        }
      }),
    }
  })
  return [_mainland, _hkmotw, _oversea]
}

async function get_options_without_street() {
  let all = await get_address_options_base()
  const newOptions = map(all, (option) => {
    if (get(option, 'value') === '广东省') {
      return {
        children: map(get(option, 'children'), (item) => {
          return {
            label: get(item, 'label'),
            value: get(item, 'value'),
            children: map(get(item, 'children'), (city) => {
              return {
                label: get(city, 'label'),
                value: get(city, 'value'),
              };
            }),
          };
        }),
        label: get(option, 'label'),
        value: get(option, 'value'),
      };
    }
    return option;
  });
  return newOptions
}

async function get_old_address_options(street = true) {
  return street ? get_address_options_base() : get_options_without_street()
}

export { get_old_address_options }
