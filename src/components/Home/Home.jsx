import React, { useEffect, useState } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "react-router-dom";
import { MdOutlineDiscount } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: grey[100],
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
}));

const Puller = styled("div")({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
});

export default function Home() {
  const [searchParams] = useSearchParams();
  const autoOpen = searchParams.get("open") === "true";

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (autoOpen) setOpen(true);
  }, [autoOpen]);

  return (
    <Root>
      <CssBaseline />

      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50vh - ${drawerBleeding}px)`,
            overflow: "visible",
            width: "400px",
            margin: "0 auto",
          },
        }}
      />

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        // جلوگیری کامل از بسته شدن
        onClose={() => {}}
        onOpen={() => {}}
        disableEscapeKeyDown={true}
        disableSwipeToOpen={true}
        swipeAreaWidth={0}
        ModalProps={{
          keepMounted: true,
          disableAutoFocus: true,
          // جلوگیری از بستن با کلیک بیرون
          onBackdropClick: (e) => e.stopPropagation(),
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "black" }}>
            <div className="flex items-center justify-center cursor-pointer">
              <span className="text-2xl">ماشین</span>
            </div>
          </Typography>
        </StyledBox>

        <StyledBox sx={{ px: 2, pb: 2, height: "100%",  }}>
          <div className="flex flex-col h-full mt-16 ">
            <div>
              <div className="flex justify-between">
                <span className="text-2xl flex">
                  <img className="w-10  ml-2.5" src="/img/sport-car.png" />
                  اسنپ
                </span>
                <span className=" text-2xl">۸۲۵,۰۰۰ ریال</span>
              </div>
            </div>
            <div className="mt-auto pb-12">
              <div className="flex justify-between px-7">
                <div>
                  <span className="flex flex-col items-center text-2xl cursor-pointer">
                    <CgDetailsMore />
                    گزینه های سفر
                  </span>
                </div>
                <div>
                  <span className="flex flex-col items-center text-2xl cursor-pointer">
                    <MdOutlineDiscount />
                     کد تخفیف
                  </span>
                </div>
              </div>
            </div>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}