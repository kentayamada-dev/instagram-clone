import { Layout } from "../../components/organisms/Layout";
import { AuthTemplate } from "../../components/templates/AuthTemplate";
import type { NextPageWithLayout } from "../../types/pages";

const Signup: NextPageWithLayout = () => <AuthTemplate isSignup />;

Signup.getLayout = (page): JSX.Element => (
  <Layout title="Instagram">{page}</Layout>
);

export default Signup;
