import React, { useEffect, useState } from 'react'
import LicenseRow from './LicenseRow';
import Pagination from '@/components/ui/pagination/Pagination';
import useUser from '@/features/user/useUser';
import { getAuthToken } from '@/common/token/token';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import useToken from '@/common/token/useToken';

function LicenseTable() {
  const [licenseStatusList, setLicenseStatusList] = useState(null)
  const { getUserLicensePurchaseStatus, getUserLicensePurchaseCount } = useUser()
  const { authState } = useGlobalCtx()
  const itemPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProductCount, setTotalProductCount] = useState();
  const { getAuthToken } = useToken();
  const [token, setToken] = useState();



  useEffect(() => {
    getAuthToken().then((result) => {
      setToken(result)


      if (result) {
        getUserLicensePurchaseCount({ accessToken: result }).then((res) => {
          if (res.status == 200) {
            setTotalProductCount(+res.data.count);
          }
        })
          .catch((err) => console.log(err));
        const payload = {
          accessToken: result,
          itemsPerPage: itemPerPage,
          startPage: currentPage,
        }
        getUserLicensePurchaseStatus(payload).then((res) => {
          if (res.status === 200) {
            setLicenseStatusList(res.data)
          }
        });
      } else {
        alert('please login')
      }
    });
  }, [])


  return (
    <div
      data-wow-delay="0s"
      className="wow fadeInUp col-12"
      style={{ visibility: "visible", animationDelay: "0s" }}
    >
      <div className="product-item offers">
        <div className="content">
          <div className="table-heading">
            <div className="column">미디어 이름</div>
            <div className="column">저작권 유형</div>
            <div className="column">트랜잭션 해쉬</div>
            <div className="column">이용기간</div>
            <div className="column">가격</div>
            <div className="column">이용권 구매일</div>
          </div>
          {
            licenseStatusList?.length > 0 ? licenseStatusList.map((license, idx) => (
              <>
                <LicenseRow key={'license-' + idx} {...license} />
              </>
            )) : <p>no licenses</p>
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

export default LicenseTable