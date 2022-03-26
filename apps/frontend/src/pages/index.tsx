import { Layout } from "../components/organisms/Layout";
import { LandingPage } from "../components/templates/LandingPage";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => <LandingPage />;

Home.getLayout = (page): JSX.Element => (
  <Layout title="Instagram">{page}</Layout>
);

export default Home;
