import { Layout } from "../components/organisms/Layout";
import { AuthTemplate } from "../components/templates/AuthTemplate";
import { useUser } from "../hooks/useUser";
import type { NextPageWithLayout } from "../types/pages";

const Home: NextPageWithLayout = () => {
  const props = useUser();

  return <AuthTemplate {...props} isSignup={false} />;
};

Home.getLayout = (page): JSX.Element => (
  <Layout title="Instagram">{page}</Layout>
);

export default Home;
