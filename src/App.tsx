import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { useLocation, BrowserRouter as Router } from "react-router-dom";
import {
  WowLookupFetcher,
  BuiltInLookupFetcherType,
  WowLookupFetchRequest,
  WowLookupFetcherConfig,
  WowLookupFetchResponse,
  BuiltInWowUrlConverterType,
  WowUrlConverter,
  WowUrlConverterConfig,
  WowUrlConvertRequest,
  WowUrlConvertResponse,
} from "@wowlink/wow-interface";
import { WowLookupFetcherFactory } from "@wowlink/wow-lookup-fetcher";
import { WowUrlConverterFactory } from "@wowlink/wow-url-converter";

// http://localhost:3000?wow=gh
// window.location.href = "https://github.com";

const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

const Home = (): JSX.Element => {
  const query = useQuery();
  // TODO(tianhaoz95): make populating the config a function and then
  // into a package where default values are defined in one place.
  const wowlink = query.get("wow");
  const devMode = query.get("dev") === "true";
  const githubUserOr = query.get("gh_user");
  const githubUser: string = githubUserOr ? githubUserOr : "wowlink";
  const githubRepoOr = query.get("gh_repo");
  const githubRepo: string = githubRepoOr ? githubRepoOr : "default-profile";
  const [progress, setProgress] = useState({ msg: "initiation" });

  useEffect(() => {
    const convertAndRedirect = async () => {
      setProgress({ msg: "fetching WowLink lookup 💤💤💤" });
      const fetcher_config: WowLookupFetcherConfig = {
        githubUser: githubUser,
        githubRepository: githubRepo
      };
      const fetcher: WowLookupFetcher = WowLookupFetcherFactory(
        BuiltInLookupFetcherType.GitHub, fetcher_config);
      const fetch_req: WowLookupFetchRequest = {};
      const fetch_res: WowLookupFetchResponse = await fetcher.fetch(fetch_req);
      const converter_config: WowUrlConverterConfig = {
        fetcherResponse: fetch_res
      };
      const converter: WowUrlConverter = WowUrlConverterFactory(
        BuiltInWowUrlConverterType.Basic, converter_config);
      const converter_req: WowUrlConvertRequest = {
        wowUrl: wowlink ? wowlink : "",
      };
      const converter_res: WowUrlConvertResponse = converter.convert(converter_req);
      setProgress({ msg: `redirect to ${converter_res.fullUrl} 🚀🚀🚀` });
      if (!devMode) {
        window.location.href = converter_res.fullUrl;
      }
    };
    if (!wowlink) {
      setProgress({ msg: "wowlink not found or not valid 🔥🔥🔥" });
      return;
    }
    convertAndRedirect();
  }, [wowlink, devMode, githubUser, githubRepo]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          I am too lazy to change the default home page ¯\_(ツ)_/¯
        </p>
        {
          wowlink &&
          <p>
            WowLink: {wowlink}
          </p>
        }
        {
          devMode &&
          <p>
            In development mode, will not redirect ¯\_(ツ)_/¯
          </p>
        }
        <p>
          Progress: {progress.msg}
        </p>
      </header>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <Router>
      <Home />
    </Router>
  );
};

export default App;
