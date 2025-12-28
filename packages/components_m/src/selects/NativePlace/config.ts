import { address_options } from '@lm_fe/env'



interface IData {
  label: string;
  value: string;
  children: IData[];
}



export default async function get_province_options() {
  let provinceCityOptions: IData[] = [];
  const mainlandData = await address_options.MAINLAND()

  Object.keys(mainlandData).forEach(provinceKey => {
    const cityItem = mainlandData[provinceKey]
    const cityKeys = cityItem.市辖区 ? cityItem.市辖区 : Object.keys(cityItem)
    const option = {
      label: provinceKey,
      value: provinceKey,
      children: cityKeys.map(_ => ({ label: _, value: _, children: [] })),
    };
    provinceCityOptions.push(option);

  })
  return provinceCityOptions
};
