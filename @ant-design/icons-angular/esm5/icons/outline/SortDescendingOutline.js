export var SortDescendingOutline = {
    name: 'sort-descending',
    theme: 'outline',
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M839.6 433.8L749 150.5a9.24 9.24 0 00-8.9-6.5h-77.4c-4.1 0-7.6 2.6-8.9 6.5l-91.3 283.3c-.3.9-.5 1.9-.5 2.9 0 5.1 4.2 9.3 9.3 9.3h56.4c4.2 0 7.8-2.8 9-6.8l17.5-61.6h89l17.3 61.5c1.1 4 4.8 6.8 9 6.8h61.2c1 0 1.9-.1 2.8-.4 2.4-.8 4.3-2.4 5.5-4.6 1.1-2.2 1.3-4.7.6-7.1zM663.3 325.5l32.8-116.9h6.3l32.1 116.9h-71.2zm143.5 492.9H677.2v-.4l132.6-188.9c1.1-1.6 1.7-3.4 1.7-5.4v-36.4c0-5.1-4.2-9.3-9.3-9.3h-204c-5.1 0-9.3 4.2-9.3 9.3v43c0 5.1 4.2 9.3 9.3 9.3h122.6v.4L587.7 828.9a9.35 9.35 0 00-1.7 5.4v36.4c0 5.1 4.2 9.3 9.3 9.3h211.4c5.1 0 9.3-4.2 9.3-9.3v-43a9.2 9.2 0 00-9.2-9.3zM310.3 167.1a8 8 0 00-12.6 0L185.7 309c-4.2 5.3-.4 13 6.3 13h76v530c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V322h76c6.7 0 10.5-7.8 6.3-13l-112-141.9z" /></svg>'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ydERlc2NlbmRpbmdPdXRsaW5lLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhci9pY29ucy8iLCJzb3VyY2VzIjpbIm91dGxpbmUvU29ydERlc2NlbmRpbmdPdXRsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sQ0FBQyxJQUFNLHFCQUFxQixHQUFtQjtJQUNqRCxJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLEtBQUssRUFBRSxTQUFTO0lBQ2hCLElBQUksRUFBRSxpeEJBQWl4QjtDQUMxeEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhcic7XG5cbmV4cG9ydCBjb25zdCBTb3J0RGVzY2VuZGluZ091dGxpbmU6IEljb25EZWZpbml0aW9uID0ge1xuICAgIG5hbWU6ICdzb3J0LWRlc2NlbmRpbmcnLFxuICAgIHRoZW1lOiAnb3V0bGluZScsXG4gICAgaWNvbjogJzxzdmcgdmlld0JveD1cIjY0IDY0IDg5NiA4OTZcIiBmb2N1c2FibGU9XCJmYWxzZVwiPjxwYXRoIGQ9XCJNODM5LjYgNDMzLjhMNzQ5IDE1MC41YTkuMjQgOS4yNCAwIDAwLTguOS02LjVoLTc3LjRjLTQuMSAwLTcuNiAyLjYtOC45IDYuNWwtOTEuMyAyODMuM2MtLjMuOS0uNSAxLjktLjUgMi45IDAgNS4xIDQuMiA5LjMgOS4zIDkuM2g1Ni40YzQuMiAwIDcuOC0yLjggOS02LjhsMTcuNS02MS42aDg5bDE3LjMgNjEuNWMxLjEgNCA0LjggNi44IDkgNi44aDYxLjJjMSAwIDEuOS0uMSAyLjgtLjQgMi40LS44IDQuMy0yLjQgNS41LTQuNiAxLjEtMi4yIDEuMy00LjcuNi03LjF6TTY2My4zIDMyNS41bDMyLjgtMTE2LjloNi4zbDMyLjEgMTE2LjloLTcxLjJ6bTE0My41IDQ5Mi45SDY3Ny4ydi0uNGwxMzIuNi0xODguOWMxLjEtMS42IDEuNy0zLjQgMS43LTUuNHYtMzYuNGMwLTUuMS00LjItOS4zLTkuMy05LjNoLTIwNGMtNS4xIDAtOS4zIDQuMi05LjMgOS4zdjQzYzAgNS4xIDQuMiA5LjMgOS4zIDkuM2gxMjIuNnYuNEw1ODcuNyA4MjguOWE5LjM1IDkuMzUgMCAwMC0xLjcgNS40djM2LjRjMCA1LjEgNC4yIDkuMyA5LjMgOS4zaDIxMS40YzUuMSAwIDkuMy00LjIgOS4zLTkuM3YtNDNhOS4yIDkuMiAwIDAwLTkuMi05LjN6TTMxMC4zIDE2Ny4xYTggOCAwIDAwLTEyLjYgMEwxODUuNyAzMDljLTQuMiA1LjMtLjQgMTMgNi4zIDEzaDc2djUzMGMwIDQuNCAzLjYgOCA4IDhoNTZjNC40IDAgOC0zLjYgOC04VjMyMmg3NmM2LjcgMCAxMC41LTcuOCA2LjMtMTNsLTExMi0xNDEuOXpcIiAvPjwvc3ZnPidcbn0iXX0=