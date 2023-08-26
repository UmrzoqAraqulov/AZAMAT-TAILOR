import { Fragment, useEffect, useState } from "react";
import { useOrders } from "../../states/orders";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";

import logo from "../../assets/images/logo.svg";
import searchIcon from "../../assets/images/search.svg";
import hamburger from "../../assets/images/hamburger.svg";

import "../style.scss";
import "./admin.scss";
import FormCustom from "../../components/FormCustom";
import {  } from "antd";
import { Form, Button, Dropdown } from "antd";

const AdminPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { getOrders } = useOrders();
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(+localStorage.getItem("pageAdmin") || 1);
  const [form] = Form.useForm();

  const pageLimit = 10;

  const params = { page, pageLimit, search, selected, form };

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

  const TableValues = { page, pageLimit, handlePage, setSelected, form };

  // <----------------- Dropdown -------------------- </>
  const items = [
    {
      key: "1",
      label: (
        <Button onClick={() => navigate("/history")} type="primary">
          Tarix
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button onClick={() => setShow(true)} type="primary">
          +Buyurtma
        </Button>
      ),
    },
  ];

  // -------------------------------------------------------

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
            <img width="30px" src={searchIcon} alt="searchIcon" />
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
        {/* -----------------Dropdown------------------- */}
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
          className="dropdown"
        >
          <Button>
            <img width="30px" src={hamburger} alt="hambuger" id="hamburger" />
          </Button>
        </Dropdown>
        {/* ---------------------------------------------- */}
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
        <FormCustom {...params} />
      </div>
    </Fragment>
  );
};

export default AdminPage;
