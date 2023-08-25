import { Fragment, useEffect, useState } from "react";
import { useOrders } from "../../states/orders";
import Table from "../../components/Table";
import searchIcon from "../../assets/images/icons8-search.svg";

import logo from "../../assets/images/logo.svg";
import "./history.scss";
import "../style.scss";

const HistoryPage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ createdAt: "", endDate: "" });
  const { getOrders } = useOrders();
  const [page, setPage] = useState(+localStorage.getItem("pageHistory") || 1);
  const pageLimit = 10;
  const { createdAt, endDate } = sort;

  useEffect(() => {
    getOrders({ page, pageLimit, search });
  }, [page, getOrders, search]);

  const handlePage = (current) => {
    localStorage.setItem("pageHistory", current);
    setPage(current);
  };

  const handleChange = (e) => {
    if (e.target.value.length < 1) setSearch("");
    else setSearch(e.target.value);
  };

  const TableValues = { page, pageLimit, handlePage };
  const initialOrders = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    setSort({ ...sort, [name]: value });
  };
  return (
    <Fragment>
      <nav className="nav">
        <img src={logo} alt="hero" className="hero" />
        <div className="sort">
          <div className="flex items-center">
            <p>Boshlanish:</p>
            <input
              type="date"
              className="border"
              onChange={initialOrders}
              value={createdAt}
              name="createdAt"
            />
          </div>
          <div className="flex items-center">
            <p>Tugash:</p>
            <input
              type="date"
              className="border"
              onChange={initialOrders}
              value={endDate}
              name="endDate"
            />
          </div>
        </div>
        <div className="searchBox">
          <input
            type="text"
            placeholder="Qidirish..."
            onChange={handleChange}
            id="search"
          />
          <label className="searchIcon" htmlFor="search">
            <img src={searchIcon} alt="searchIcon" />
          </label>
        </div>
      </nav>

      <Table {...TableValues} />
    </Fragment>
  );
};

export default HistoryPage;
