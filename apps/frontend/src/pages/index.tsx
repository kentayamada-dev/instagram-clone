import { Layout } from "../components/organisms/Layout";
import { AuthTemplate } from "../components/templates/AuthTemplate";
import type { NextPageWithLayout } from "../types/pages";

const Home: NextPageWithLayout = () => <AuthTemplate isSignup={false} />;

Home.getLayout = (page): JSX.Element => (
  <Layout title="Instagram">{page}</Layout>
);

export default Home;
