export function createTimelineInstruction(element, keyframes, preStyleProps, postStyleProps, duration, delay, easing, subTimeline) {
    if (easing === void 0) { easing = null; }
    if (subTimeline === void 0) { subTimeline = false; }
    return {
        type: 1 /* TimelineAnimation */,
        element: element,
        keyframes: keyframes,
        preStyleProps: preStyleProps,
        postStyleProps: postStyleProps,
        duration: duration,
        delay: delay,
        totalTime: duration + delay,
        easing: easing,
        subTimeline: subTimeline
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3RpbWVsaW5lX2luc3RydWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5pbWF0aW9ucy9icm93c2VyL3NyYy9kc2wvYW5pbWF0aW9uX3RpbWVsaW5lX2luc3RydWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxNQUFNLFVBQVUseUJBQXlCLENBQ3JDLE9BQVksRUFBRSxTQUF1QixFQUFFLGFBQXVCLEVBQUUsY0FBd0IsRUFDeEYsUUFBZ0IsRUFBRSxLQUFhLEVBQUUsTUFBMEIsRUFDM0QsV0FBNEI7SUFESyx1QkFBQSxFQUFBLGFBQTBCO0lBQzNELDRCQUFBLEVBQUEsbUJBQTRCO0lBQzlCLE9BQU87UUFDTCxJQUFJLDJCQUFzRDtRQUMxRCxPQUFPLFNBQUE7UUFDUCxTQUFTLFdBQUE7UUFDVCxhQUFhLGVBQUE7UUFDYixjQUFjLGdCQUFBO1FBQ2QsUUFBUSxVQUFBO1FBQ1IsS0FBSyxPQUFBO1FBQ0wsU0FBUyxFQUFFLFFBQVEsR0FBRyxLQUFLO1FBQzNCLE1BQU0sUUFBQTtRQUNOLFdBQVcsYUFBQTtLQUNaLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHvJtVN0eWxlRGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0FuaW1hdGlvbkVuZ2luZUluc3RydWN0aW9uLCBBbmltYXRpb25UcmFuc2l0aW9uSW5zdHJ1Y3Rpb25UeXBlfSBmcm9tICcuLi9yZW5kZXIvYW5pbWF0aW9uX2VuZ2luZV9pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uVGltZWxpbmVJbnN0cnVjdGlvbiBleHRlbmRzIEFuaW1hdGlvbkVuZ2luZUluc3RydWN0aW9uIHtcbiAgZWxlbWVudDogYW55O1xuICBrZXlmcmFtZXM6IMm1U3R5bGVEYXRhW107XG4gIHByZVN0eWxlUHJvcHM6IHN0cmluZ1tdO1xuICBwb3N0U3R5bGVQcm9wczogc3RyaW5nW107XG4gIGR1cmF0aW9uOiBudW1iZXI7XG4gIGRlbGF5OiBudW1iZXI7XG4gIHRvdGFsVGltZTogbnVtYmVyO1xuICBlYXNpbmc6IHN0cmluZ3xudWxsO1xuICBzdHJldGNoU3RhcnRpbmdLZXlmcmFtZT86IGJvb2xlYW47XG4gIHN1YlRpbWVsaW5lOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGltZWxpbmVJbnN0cnVjdGlvbihcbiAgICBlbGVtZW50OiBhbnksIGtleWZyYW1lczogybVTdHlsZURhdGFbXSwgcHJlU3R5bGVQcm9wczogc3RyaW5nW10sIHBvc3RTdHlsZVByb3BzOiBzdHJpbmdbXSxcbiAgICBkdXJhdGlvbjogbnVtYmVyLCBkZWxheTogbnVtYmVyLCBlYXNpbmc6IHN0cmluZ3xudWxsID0gbnVsbCxcbiAgICBzdWJUaW1lbGluZTogYm9vbGVhbiA9IGZhbHNlKTogQW5pbWF0aW9uVGltZWxpbmVJbnN0cnVjdGlvbiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQW5pbWF0aW9uVHJhbnNpdGlvbkluc3RydWN0aW9uVHlwZS5UaW1lbGluZUFuaW1hdGlvbixcbiAgICBlbGVtZW50LFxuICAgIGtleWZyYW1lcyxcbiAgICBwcmVTdHlsZVByb3BzLFxuICAgIHBvc3RTdHlsZVByb3BzLFxuICAgIGR1cmF0aW9uLFxuICAgIGRlbGF5LFxuICAgIHRvdGFsVGltZTogZHVyYXRpb24gKyBkZWxheSxcbiAgICBlYXNpbmcsXG4gICAgc3ViVGltZWxpbmVcbiAgfTtcbn1cbiJdfQ==