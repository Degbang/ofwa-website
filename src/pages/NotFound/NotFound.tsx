import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../../components/ui/PageHero';

const NotFound: React.FC = () => (
  <PageHero kicker="Error 404" title="That page does not exist." lede="It may have moved, or the link may be mistyped. Here are some good places to start.">
    <Link to="/" className="btn">
      Back to the homepage <ArrowRight size={16} />
    </Link>
    <Link to="/programs" className="btn btn-line">Our programs</Link>
  </PageHero>
);

export default NotFound;
