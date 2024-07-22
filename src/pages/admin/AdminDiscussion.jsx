import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { getAllDiscussionsAction } from "../../redux/action/discussions/DiscussionsAction";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminCard } from "../../assets/components/admin/AdminCard";
import { Pagination } from "../../assets/components/pagination/Pagination";
import { AdminManageDiscussion } from "../../assets/components/admin/AdminManageDiscussion";

export const AdminDiscussion = () => {
  const dispatch = useDispatch();

  const [openNavbar, setOpenNavbar] = useState(false);

  const discussionData = useSelector(
    (state) => state.discussions.discussionsAdmin.discussions,
  );
  const paginationDiscussion = useSelector(
    (state) => state.discussions.discussionsAdmin.pagination,
  );

  openNavbar
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllDiscussionsAction(""));
    };

    fetchData();
  }, []);

  const handleOpenNavbar = (openValue) => setOpenNavbar(openValue);

  const handleQuery = (formatLink) => {
    dispatch(getAllDiscussionsAction(formatLink));
  };

  return (
    <>
      <div className="flex">
        <div className="fixed w-[20%]">
          <AdminSidebar />
        </div>
        <div className="ml-auto flex w-full flex-col lg:w-[80%]">
          <AdminNavbar onOpen={handleOpenNavbar} />
          <AdminCard />
          <div className="flex flex-col justify-center gap-1 px-5 pb-16 pt-10">
            <h5 className="mb-2 text-xl font-semibold">Manage Discussion</h5>
            <div className="grid gap-6 md:grid-cols-2">
              {discussionData.length > 0 ? (
                discussionData?.map((discussion, index) => (
                  <AdminManageDiscussion discussion={discussion} key={index} />
                ))
              ) : (
                <p className="col-span-2 text-center text-lg font-bold italic text-neutral-4">
                  No Discussion found
                </p>
              )}
            </div>

            {/* Pagination Section */}
            <div className="mx-auto">
              <Pagination
                onQuery={handleQuery}
                type={"discussions"}
                nextLink={paginationDiscussion?.links?.next}
                prevLink={paginationDiscussion?.links?.prev}
                totalItems={paginationDiscussion?.total_items}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
