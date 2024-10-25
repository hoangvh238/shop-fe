import axios from "axios";

import ProductDetailModule from "@/components/modules/ProductDetailModule";
import { endpointProduct } from "@/helpers/enpoints";
import { enums } from "@/settings";

const getProductByID = async (id: string) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpointProduct.GET_CUSTOM_PRODUCT.replace("{id}", id),
    headers: {
      "X-API-Key": "{{token}}",
    },
  };

  try {
    const response = await axios.request(config);

    return response;
  } catch (error) {
    return error;
  }
};

export default async function ProductDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const data: any = await getProductByID(id);

  const product = {
    items: [{ ...data?.data?.result }],
    name: data?.data?.result?.name ?? "",
    colors: [
      {
        name: data?.data?.result?.color,
        hex: enums.Color[
          data?.data?.result?.color.toUpperCase() as keyof typeof enums.Color
        ],
      },
    ],
  };


  return <ProductDetailModule product={product} />;
}
export const revalidate = 20;
