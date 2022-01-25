import React from "react";
import { Header } from "../../components";

export default {
  title: "components/Header",
  component: Header,
};

const tabs = [
  {
    title: "Picks",
  },
  {
    title: "Results",
  },
  {
    title: "Leagues",
  },
  {
    title: "Contact",
  },
];

export const Main = () => <Header tabs={tabs} />;
