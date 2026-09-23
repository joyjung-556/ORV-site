# Mixpanel 이벤트 설계

`.env.local`에 `VITE_MIXPANEL_TOKEN=프로젝트_토큰`을 추가하면 추적이 시작됩니다. 토큰이 없으면 사이트는 오류 없이 추적만 생략합니다.

## 이벤트

| 이벤트 | 목적 | 주요 속성 |
| --- | --- | --- |
| `page_viewed` | 화면 진입과 이전 화면 확인 | `page_id`, `page_name`, `previous_page_id`, `previous_page_name`, `entry_url`, `referrer` |
| `page_exited` | 화면 체류 시간 확인 | `page_id`, `page_name`, `next_page_id`, `next_page_name`, `duration_seconds`, `engaged_seconds`, `exit_reason` |
| `internal_navigation` | 화면 간 실제 이동 경로 확인 | `from_page_id`, `from_page_name`, `to_page_id`, `to_page_name`, `navigation_method` |
| `external_link_clicked` | 외부 목적지별 이동량 확인 | `source_page_id`, `source_page_name`, `link_label`, `link_area`, `destination_url`, `destination_host`, `destination_path` |

모든 이벤트에는 `session_id`, `device_type`, `viewport_width`, `viewport_height`, `page_path`가 공통으로 포함됩니다. `engaged_seconds`는 브라우저 탭이 화면에 보인 시간만 합산하며, `duration_seconds`는 진입부터 이탈까지의 전체 시간입니다.

## Mixpanel에서 만들 리포트

1. **화면 이동 흐름**: Flows에서 이벤트를 `page_viewed`로 선택하고 `page_name`으로 분해합니다. 시작 지점을 원하는 화면으로 지정하면 다음에 어디로 이동했는지 볼 수 있습니다.
2. **내부 이동 경로**: Insights에서 `internal_navigation`을 선택하고 `from_page_name`, `to_page_name`을 Breakdown으로 추가합니다.
3. **가장 많이 이동한 외부 링크**: Insights에서 `external_link_clicked`의 Unique Users 또는 Total Events를 보고 `destination_host`와 `link_label`로 분해합니다. `source_page_name` 필터로 화면별 성과도 볼 수 있습니다.
4. **가장 오래 머문 화면**: Insights에서 `page_exited`를 선택해 `engaged_seconds`의 Average를 계산하고 `page_name`으로 분해합니다. 함께 Median 또는 75th percentile을 보면 일부 장기 체류 사용자의 왜곡을 줄일 수 있습니다.
5. **화면별 외부 전환율**: `page_viewed` → `external_link_clicked` Funnel을 만들고 `source_page_name`으로 분해합니다.

분석 동의창 없이 기본 수집합니다. 이름·이메일 같은 프로필 정보와 IP 기반 위치 수집은 사용하지 않습니다. 기존에 명시적으로 거부한 방문자와 브라우저 Do Not Track 설정은 존중합니다.
