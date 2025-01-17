import { Transferable } from "data/transferable";
import { Link } from "data/value";
import { DateTime, Duration } from "luxon";

describe("Literals", () => {
    test("String", () => checkRoundTrip("hello"));
    test("Number", () => checkRoundTrip(18));
    test("Boolean", () => checkRoundTrip(true));
    test("Null", () => checkRoundTrip(null));
});

test("Date", () => expect(roundTrip(DateTime.fromObject({ year: 1982, month: 5, day: 25 })).day).toEqual(25));
test("Duration", () => expect(roundTrip(Duration.fromMillis(10000)).toMillis()).toEqual(10000));
test("Link", () => expect(roundTrip(Link.file("hello"))).toEqual(Link.file("hello")));

/** Run a value through the transferable converter and back again. */
function roundTrip<T>(value: T): T {
    return Transferable.value(Transferable.transferable(value));
}

function checkRoundTrip(value: any) {
    expect(roundTrip(value)).toEqual(value);
}
