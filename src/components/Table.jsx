import { Pagination, Spin } from "antd";
import PropTypes from "prop-types";
import { useOrders } from "../states/orders";
import "./table.scss";
import moreBtn from "../assets/images/more.svg";


const Table = ({ page, pageLimit, handlePage }) => {
  const { loading, ordersData, total } = useOrders();
  return (
    <section>
      {loading ? (
        <div className="loader">
          <Spin size="large" />
        </div>
      ) : (
        <table id="table">
          <thead>
            <tr className="th-tr">
              <th className="first-th" scope="col">
                #
              </th>
              <th className="name-th" scope="col">
                MIJOZLAR
              </th>
              <th className="order-th" scope="col">
                BUYURTMA
              </th>
              <th className="didline-th" scope="col">
                MUDDAT
              </th>
              <th className="getOrder-th" scope="col">
                OLINGAN VAQTI
              </th>
              <th className="price-th" scope="col">
                NARX
              </th>
              <th className="last-th" scope="col">
                KO’PROQ
              </th>
            </tr>
          </thead>
          <tbody className="table-row">
            {ordersData.map((el, i) => (
              <tr key={el.id} className="tb-tr">
                <td className="first-td">{(page - 1) * pageLimit + i + 1}</td>
                <td>
                  {el?.customer.charAt(0).toUpperCase() + el?.customer.slice(1)}
                </td>
                <td>{el?.products}</td>
                <td>{el?.endDate?.split("T")[0]}</td>
                <td>{el?.createdAt?.split("T")[0]}</td>
                <td>{el?.toPay}</td>
                <td className="last-td"><img src={moreBtn} alt="" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading?<Pagination
        current={page}
        total={total}
        onChange={handlePage}
        defaultPageSize={pageLimit}
        defaultCurrent={page}
        className="pagination"
      />:null}
    </section>
  );
};

Table.propTypes = {
  page: PropTypes.number,
  pageLimit: PropTypes.number,
  handlePage: PropTypes.func,
};
export default Table;
