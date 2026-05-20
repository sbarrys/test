import streamlit as st


st.set_page_config(
    page_title="AI 협업 개발 실습",
    layout="centered",
)

st.title("AI 협업 개발 실습용 첫 번째 앱")
st.write("Streamlit으로 만든 첫 번째 웹앱입니다.")

st.divider()

name = st.text_input("이름을 입력하세요", placeholder="예: 홍길동")
goal = st.text_area(
    "오늘 AI와 함께 만들어 보고 싶은 것은 무엇인가요?",
    placeholder="예: 간단한 데이터 분석 대시보드",
)

if st.button("결과 확인"):
    if name and goal:
        st.success(f"{name}님, 오늘의 실습 목표는 '{goal}'입니다.")
    elif name:
        st.warning("실습 목표를 입력해 주세요.")
    elif goal:
        st.warning("이름을 입력해 주세요.")
    else:
        st.warning("이름과 실습 목표를 입력해 주세요.")

st.caption("실행 명령어: streamlit run app.py")
