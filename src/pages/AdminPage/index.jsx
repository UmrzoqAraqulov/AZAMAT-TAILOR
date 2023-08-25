import { Fragment, useEffect, useState } from "react";
import { useOrders } from "../../states/orders";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";

import logo from "../../assets/images/logo.svg";
import searchIcon from "../../assets/images/icons8-search.svg";
import "../style.scss";
import "./admin.scss";
import FormCustom from "../../components/FormCustom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { getOrders } = useOrders();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(+localStorage.getItem("pageAdmin") || 1);
  const pageLimit = 10;

  useEffect(() => {
    getOrders({ page, pageLimit, search });
  }, [page, getOrders, search]);

  const handlePage = (current) => {
    localStorage.setItem("pageAdmin", current);
    setPage(current);
  };

  const handleChange = (e) => {
    if (e.target.value.length < 1) setSearch("");
    else setSearch(e.target.value);
  };

  const TableValues = { page, pageLimit, handlePage };

  return (
    <Fragment>
      <nav className="nav">
        <img src={logo} alt="hero" className="hero" />
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

        <div className="nav-right">
          <button
            onClick={() => navigate("/history")}
            className="nav-right_btn historyBtn"
          >
            Tarix
          </button>
          <button
            onClick={() => setShow(true)}
            className="nav-right_btn getOrderBtn"
          >
            + Buyurtma
          </button>
        </div>
      </nav>
      <Table {...TableValues} />
      <div
        style={show ? { top: "0" } : { top: "-100%" }}
        onClick={() => setShow(false)}
        className="modal-close"
      ></div>
      <div style={show ? { top: "0" } : { top: "-100%" }} className="modal">
        <div className="close-btn">
          <i onClick={() => setShow(false)} className="fa-solid fa-xmark"></i>
        </div>
        <FormCustom />
      </div>
    </Fragment>
  );
};

export default AdminPage;
