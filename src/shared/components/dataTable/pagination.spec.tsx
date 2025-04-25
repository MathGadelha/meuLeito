import { act, fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { IPagination, Pagination } from "./pagination";

const pageInfoMock = {
	page: 1,
	perPage: 10,
	total: 30,
};

const pageInfoMockNoNextPage = {
	page: 1,
	perPage: 10,
	total: 2,
};

const pageInfoMockNotFirstPage = {
	page: 2,
	perPage: 10,
	total: 30,
};

const pageInfoMockLastPage = {
	page: 3,
	perPage: 10,
	total: 30,
};

const mock: IPagination = {
	label: "Registro por página mockados",
	pageInfo: pageInfoMock,
	numbersPerPage: [5, 10],
	handleNextPage: vitest.fn().mockImplementation(() => {
		if (mock.pageInfo) {
			mock.pageInfo.page++;
			return mock.pageInfo.page;
		}
	}),
	handlePreviousPage: vitest.fn().mockImplementation(() => {
		if (mock.pageInfo) {
			mock.pageInfo.page--;
			return mock.pageInfo.page;
		}
	}),
	handleSelectPerPage: vitest.fn(),
};

function makeSut(rest: IPagination) {
	return render(<Pagination {...rest} />);
}

describe("Pagination", () => {
	it("should be renders correctly and present data", () => {
		const { getByText, getByRole } = makeSut({
			...mock,
		});

		const label = getByText(mock.label!);
		const pageInfo = getByText(
			`Página ${pageInfoMock.page} de ${Math.ceil(
				pageInfoMock.total / pageInfoMock.perPage
			)}`
		);
		const selectItemsPerPage = getByRole("combobox");
		const previousPageButton = getByRole("button", {
			name: /anterior/i,
		});
		const nextPageButton = getByRole("button", {
			name: /próximo/i,
		});

		expect(label).not.toBeNull();
		expect(selectItemsPerPage).not.toBeNull();
		expect(previousPageButton).not.toBeNull();
		expect(nextPageButton).not.toBeNull();
		expect(pageInfo).not.toBeNull();
	});

	it("should be present numbers per page dropdown", async () => {
		const { getByTestId } = makeSut({
			...mock,
		});

		const selectItemsPerPage = getByTestId("items-per-page-dropdown");

		await act(async () => {
			fireEvent.change(selectItemsPerPage, { target: { value: "5" } });
		});

		const selectedValue = selectItemsPerPage.getAttribute("value");

		expect(selectItemsPerPage).not.toBeNull();
		expect(selectedValue).toBe("5");
	});

	it("should be rendered nextPageButton with disabled property false when there is a next page", () => {
		const { getByRole } = makeSut({
			...mock,
		});

		const nextPageButton = getByRole("button", {
			name: /próximo/i,
		});

		expect(nextPageButton).toHaveProperty("disabled", false);
	});

	it("should be rendered nextPageButton disabled when there is no next page", () => {
		const { getByRole } = makeSut({
			...mock,
			pageInfo: pageInfoMockNoNextPage,
		});

		const nextPageButton = getByRole("button", {
			name: /próximo/i,
		});

		expect(nextPageButton).toHaveProperty("disabled", true);
	});

	it("should be rendered nextPageButton disabled when on last page", () => {
		const { getByRole } = makeSut({
			...mock,
			pageInfo: pageInfoMockLastPage,
		});

		const nextPageButton = getByRole("button", {
			name: /próximo/i,
		});

		expect(nextPageButton).toHaveProperty("disabled", true);
	});

	it("should be rendered previousPageButton disabled when on the first page", () => {
		const { getByRole } = makeSut({
			...mock,
		});

		const previousPageButton = getByRole("button", {
			name: /anterior/i,
		});

		expect(previousPageButton).toHaveProperty("disabled", true);
	});

	it("should be rendered previousPageButton with disabled property false when not on the first page", () => {
		const { getByRole } = makeSut({
			...mock,
			pageInfo: pageInfoMockNotFirstPage,
		});

		const previousPageButton = getByRole("button", {
			name: /anterior/i,
		});

		expect(previousPageButton).toHaveProperty("disabled", false);
	});

	it("should be call handleNextPage", () => {
		const { getByRole } = makeSut({
			...mock,
		});

		const previousPageButton = getByRole("button", {
			name: /próximo/i,
		});

		// ? Verifica valor de page antes de clicar
		expect(mock.pageInfo?.page).toEqual(1);

		act(() => {
			fireEvent.click(previousPageButton);
		});

		expect(mock.handleNextPage).toBeCalledTimes(1);
		expect(mock.pageInfo?.page).toEqual(2);
	});

	it("should be call handlePreviousPage", () => {
		const { getByRole } = makeSut({
			...mock,
		});

		const previousPageButton = getByRole("button", {
			name: /anterior/i,
		});

		// ? Verifica valor de page antes de clicar
		expect(mock.pageInfo?.page).toEqual(2);

		act(() => {
			fireEvent.click(previousPageButton);
		});

		expect(mock.handlePreviousPage).toBeCalledTimes(1);
		expect(mock.pageInfo?.page).toEqual(1);
	});
});
