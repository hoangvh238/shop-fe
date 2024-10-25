"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import { endpointProduct } from "@/helpers/enpoints";

const SearchModule = () => {
  const params = useSearchParams();

  const query = params.get("keyword") ?? "";

  const getDataSearch = async () => {
    const data = await axios({
      method: "post",
      data: {
        query: {
          match: {
            name: {
              query: query,
              fuzziness: "AUTO",
            },
          },
        },
      },
      url: endpointProduct.SEARCH_PRODUCT,
      headers: {
        Authorization:
          "ApiKey TFloNnc1SUJWWkpoVHl3dFMyX2k6TzhGczd4QVBSOHlTNnFncW1ZRXFjUQ==",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        Host: "<calculated when request is sent>",
      },
    });

  };

  React.useEffect(() => {
    getDataSearch();
  }, [query]);

  return (
    <div className="container mx-auto px-2 py-4 pb-16 lg:px-24">
      <h1>
        Kết quả tìm kiếm cho từ khoá &apos;
        <span className="text-red-500">{query}</span>&lsquo;
      </h1>
    </div>
  );
};

export default SearchModule;
