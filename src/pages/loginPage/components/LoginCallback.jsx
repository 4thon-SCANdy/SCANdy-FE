import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultInstance from "../../../apis/utils/instance";

const LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");

      if (!code || !state) {
        console.error("구글 로그인 파라미터 누락");
        navigate("/", { state: { success: false } });
        return;
      }

      try {
        const res = await defaultInstance.post(`/auth/google/login/`, {
          code,
          state,
        });

        if (res.status === 200 && res.data.token) {
          sessionStorage.setItem("access_token", res.data.token);
          sessionStorage.setItem("email", res.data.email);
          console.log("로그인 성공: ", res.data.email);
          navigate("/", { state: { success: true, email: res.data.email } });
        } else {
          console.error("서버 응답 오류: ", res.data);
          navigate("/", { state: { success: false } });
        }
      } catch (error) {
        console.error("콜백 처리 오류: ", error);
        navigate("/", { state: { success: false } });
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return null;
};

export default LoginCallback;
