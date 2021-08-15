import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import "./friendAdd.scss";
import ButtonSubmit from "@components/ButtonSubmit/ButtonSubmit";
import * as userAction from "@store/actions/userActions";
import FriendAddList from "./FriendAddList/FriendAddList";
import { formatQuery, decodeQuery } from "@utils/string";

type formTypes = {
  search: string;
};

const FriendAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState<Number>(1);
  const [pageSize, setPageSize] = useState<Number>(10);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<formTypes>({
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    const querySearch = decodeQuery(location.search);
    if (querySearch.query) {
      setValue("search", querySearch.query, { shouldDirty: true });
      dispatch(
        userAction.searchUser({
          body: {
            query: querySearch.query,
            page: querySearch.page || page,
            pageSize: querySearch.pageSize || pageSize,
          },
        })
      );
    }
  }, []);

  const onSubmit = (data: any) => {
    setPage(1);
    const queryUrl = formatQuery({ query: data.search, page: 1, pageSize });
    history.replace(`${location.pathname}?${queryUrl}`);
    dispatch(
      userAction.searchUser({
        body: { query: data.search, page: 1, pageSize },
      })
    );
  };

  return (
    <div className="wrap-friend-add">
      <div className="friend-add-big-title">THÊM BẠN</div>
      <div className="friend-add-sub-title">
        Bạn có thể thêm bạn bè bằng CallG Id của họ. Với tìm kiếm bằng tên không
        phân biệt chữ Hoa và chữ Thường!
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="friend-add-search">
        <input
          className="friend-add-search-input"
          {...register("search", { required: true })}
          placeholder="Nhập tên, mã ID,..."
        />

        <ButtonSubmit
          className={`friend-add-search-sumit ${
            isDirty && "friend-add-search-sumit--active"
          }`}
        >
          Tìm kiếm bạn bè
        </ButtonSubmit>
      </form>
      <FriendAddList />
    </div>
  );
};

export default FriendAdd;
