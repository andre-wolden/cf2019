/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import H3 from 'components/H3';
import CenteredSection from './CenteredSection';
import Section from './Section';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article>
        <Helmet>
          <title>Saalbach 2019 Program</title>
          <meta
            name="description"
            content="Saalbach 2019 Program"
          />
        </Helmet>
        <div>
          <CenteredSection>
            <H2>
              Saalbach 2019 Program
            </H2>
            <p>
              Carlsen Fritzøe
            </p>
            <p>
              19/1 – 23/1 – 2019
            </p>
          </CenteredSection>


          <Section>
            <H3>
              Lørdag 19.jan.
            </H3>
            <div>
              <div>12.30 Avreise med buss fra CF Larvik-Gardemoen</div>
              <div>17.00 Avgang Gardemoen-Salzburg</div>
              <div>20.00 Buss Salzburg-Saalbach / innsjekk Hotel Kristiana/enkel bevertning</div>
            </div>
          </Section>

          <Section>
            <H3>
              Søndag 20. jan.
            </H3>
            <div>
              <div>08.00 Frokost</div>
              <div>10.00 Dagen til fri disp</div>
              <div>16.00 Samling Hinterhag Alm</div>
              <div>18.00 Samling. Foredrag fra Isola v/Tor Ivar</div>
              <div>20.00 Middag på hotellet.</div>
            </div>
          </Section>

          <Section>
            <H3>
              Mandag 21.jan.
            </H3>
            <div>
              <div>08.00 Frokost</div>
              <div>10.00 Dagen til fri disp</div>
              <div>16.00 Samling Hinterhag Alm</div>
              <div>18.00 Cf foredrag/info</div>
              <div>20.00 Middag</div>
            </div>
          </Section>

          <Section>
            <H3>
              Tirsdag 22.jan.

            </H3>
            <div>
              <div>08.00 frokost</div>
              <div>10.00 Byggeskikk i Østerrike v/Josef Rainer (lokalt)</div>
              <div>11.00 Samling ved schattberg ski heis. Rundtur med Tore Østby/guid mot Leogang.</div>
              <div>18.00 Tor Ivar Isola foredrag.</div>
              <div>20.00 Middag</div>
            </div>
          </Section>

          <Section>
            <H3>
              Onsdag 23.jan.
            </H3>
            <div>
              <div>07.30 Frokost</div>
              <div>08.30 Sjekk ut av hotellet/avreise til Salzburg</div>
              <div>13.00 Avreise fra Salzburg</div>
            </div>
          </Section>




        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
