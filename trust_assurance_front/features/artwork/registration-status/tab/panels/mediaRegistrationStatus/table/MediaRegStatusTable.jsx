import React, { useEffect } from "react";
import MediaRegStatusRow from "./MediaRegStatusRow";
import Pagination from "@/components/ui/pagination/Pagination";
import useArtworks from "@/features/artwork/useArtworks";
import { useUserCtx } from "@/features/user/useUserCtx";
import { useState } from "react";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import useToken from "@/common/token/useToken";

function MediaRegStatusTable() {
  const { getMediaRegistrationStatus, isLoading, mediaRegistrationStatus, getMediaCount } = useArtworks();
  const { getAuthToken } = useToken();
  const [totalProductCount, setTotalProductCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState();
  const [sort, setSort] = useState({ isAsc: false, sortOptions: "date" });
  const itemPerPage = 20;
  const { setPopupState } = usePopupCtx();

  function changeSort(sortOption) {
    if (sort.sortOptions === sortOption) {
      setSort(prev => ({ ...prev, isAsc: !prev.isAsc }))
    } else {
      setSort(prev => ({ ...prev, sortOptions: sortOption }))
    }
  }

  useEffect(() => {
    getAuthToken().then((res) => {
      setToken(res)


      if (res) {
        getMediaCount({ accessToken: res }).then((res) => {
          if (res.status == 200) {
            setTotalProductCount(+res.data.count);
          }
        })
          .catch((err) => console.log(err));
        getMediaRegistrationStatus({
          accessToken: res,
          itemsPerPage: itemPerPage,
          startPage: currentPage,
          arrange: sort.isAsc ? "asc" : "desc",
          sortOption: sort.sortOptions
        });
        setPopupState(prev => ({
          ...prev, getMediaRegistrationStatusPayload: {
            accessToken: res,
            itemsPerPage: itemPerPage,
            startPage: currentPage,
            arrange: sort.isAsc ? "asc" : "desc",
            sortOption: sort.sortOptions
          }
        }))
      }
    });
  }, [currentPage, sort])

  return (
    <div>
      <div className="product-item offers">
        <div className="content">
          <div className="table-heading">
            <div className="column" onClick={() => changeSort("media_name")}>미디어 이름</div>
            <div className="column" onClick={() => changeSort("token_type")}>토큰 유형</div>
            <div className="column" onClick={() => changeSort("tokenid")}>토큰 ID</div>
            <div className="column" onClick={() => changeSort("date")}>등록일자</div>
            <div className="column" >저작권 유형</div>
            <div className="column" >저작권 토큰 발행</div>
          </div>
          {
            mediaRegistrationStatus?.length > 0 && mediaRegistrationStatus?.map((data, index) => (
              <MediaRegStatusRow data={...data} key={"MediaRegStatusRow" + index} />
            ))
          }
          <Pagination
            totalProductCount={totalProductCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(totalProductCount / itemPerPage)}
          />
        </div>
      </div>
    </div>
  );
}

export default MediaRegStatusTable;
