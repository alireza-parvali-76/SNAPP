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
import car from "/img/sport-car.png";

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
  const [price, setPrice] = useState(0); 

  useEffect(() => {
    if (autoOpen) setOpen(true);
  }, [autoOpen]);

  // انیمیشن عدد هنگام باز شدن Drawer
  useEffect(() => {
    if (!open) return;
    let start = 0;
    const end = 825000;
    const duration = 1000;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * end);
      setPrice(current);

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [open]);

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
        {/* بالای Drawer */}
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
          <Typography component="div" sx={{ p: 2, color: "black" }}>
            <div className="flex items-center justify-center cursor-pointer">
              <span className="text-2xl">ماشین</span>
            </div>
          </Typography>
        </StyledBox>

        {/* بدنه Drawer */}
        <StyledBox sx={{ px: 2, pb: 2, height: "100%" }}>
          <div className="flex flex-col h-full mt-16 ">
            {/* بخش بالایی */}
            <div>
              <div className="flex justify-between">
                <span className="text-2xl flex">
                  <img className="w-10 ml-2.5" src={car} />
                  اسنپ
                </span>
                <span className="text-2xl">
                  {price.toLocaleString("fa-IR")} ریال
                </span>
              </div>
            </div>

            {/* بخش پایین Drawer */}
            <div className="mt-auto pb-12">
              <div className="flex justify-between px-7">
                <span className="flex flex-col items-center text-2xl cursor-pointer">
                  <CgDetailsMore />
                  گزینه‌های سفر
                </span>
                <span className="flex flex-col items-center text-2xl cursor-pointer">
                  <MdOutlineDiscount />
                  کد تخفیف
                </span>
              </div>
            </div>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
