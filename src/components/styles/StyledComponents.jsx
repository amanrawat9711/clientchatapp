import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  border: "0",
  height: "-1",
  margin: "-1",
  clip: "rect(0 0 0 0)",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: 1,
  whiteSpace: "nowrap",
});

const Link = styled(LinkComponent)({
  textDecoration: "none",
  color: "black",
  padding: "1rem",
  "&:hover": {
    backgroundColor: "pink",
  },
});

const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  padding: "0 3rem",
  borderRadius: "1.5rem",
  backgroundColor: "gray",
});

const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: purple;
  font-size: 1.1rem;
`;

const CurveButton = styled("button")`
  padding: 1rem 2rem;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: gray;
  font-size: 1.1rem;
  color: white;
  cursor: pointer;
`;

const bounceAnimation = keyframes`
0%{transform : scale(1)}
50%{transform : scale(1.5)}
100%{transform : scale(1)}
`

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation:`${bounceAnimation} 1s infinite`
}));

export {
  CurveButton,
  SearchField,
  InputBox,
  Link,
  VisuallyHiddenInput,
  BouncingSkeleton,
};
